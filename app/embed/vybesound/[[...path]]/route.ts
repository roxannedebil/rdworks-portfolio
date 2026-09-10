import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const ORIGIN = "https://vybesound.com";
const PROXY_PREFIX = "/embed/vybesound";

function buildTarget(path: string[] | undefined, search: string) {
  const subpath = path?.length ? path.join("/") : "";
  return `${ORIGIN}/${subpath}${search}`;
}

function rewriteHtml(html: string) {
  const cleaned = html
    .replace(/<meta[^>]+http-equiv=["']?Content-Security-Policy["']?[^>]*>/gi, "")
    .replace(/<meta[^>]+http-equiv=["']?X-Frame-Options["']?[^>]*>/gi, "");

  const inject = `
    <base href="${ORIGIN}/">
    <script>
      (function () {
        var ORIGIN_HOST = "vybesound.com";
        var PROXY = "${PROXY_PREFIX}";

        function toProxy(href) {
          try {
            var url = new URL(href, "${ORIGIN}/");
            var host = url.hostname.replace(/^www\\./, "");
            if (host !== ORIGIN_HOST) return null;
            var next =
              PROXY +
              (url.pathname === "/" ? "" : url.pathname) +
              url.search +
              url.hash;
            return next;
          } catch (e) {
            return null;
          }
        }

        document.addEventListener(
          "click",
          function (event) {
            var anchor = event.target && event.target.closest
              ? event.target.closest("a")
              : null;
            if (!anchor || !anchor.href) return;
            if (event.defaultPrevented) return;
            if (event.button !== 0) return;
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            if (anchor.target && anchor.target !== "_self") return;

            var proxyUrl = toProxy(anchor.href);
            if (!proxyUrl) return;

            event.preventDefault();
            window.location.href = proxyUrl;
          },
          true
        );
      })();
    </script>
  `;

  if (/<head[^>]*>/i.test(cleaned)) {
    return cleaned.replace(/<head([^>]*)>/i, `<head$1>${inject}`);
  }

  return `${inject}${cleaned}`;
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path?: string[] }> },
) {
  const { path } = await context.params;
  const target = buildTarget(path, request.nextUrl.search);

  let upstream: Response;
  try {
    upstream = await fetch(target, {
      headers: {
        "User-Agent":
          request.headers.get("user-agent") ||
          "Mozilla/5.0 (compatible; RDWorksPortfolioPreview/1.0)",
        Accept: request.headers.get("accept") || "text/html,application/xhtml+xml",
      },
      redirect: "follow",
    });
  } catch {
    return new NextResponse("Preview unavailable right now.", { status: 502 });
  }

  const contentType = upstream.headers.get("content-type") || "text/html; charset=utf-8";

  if (!contentType.includes("text/html")) {
    return new NextResponse(upstream.body, {
      status: upstream.status,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=300",
      },
    });
  }

  const html = rewriteHtml(await upstream.text());

  return new NextResponse(html, {
    status: upstream.status,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "Content-Security-Policy": "frame-ancestors 'self'",
    },
  });
}
