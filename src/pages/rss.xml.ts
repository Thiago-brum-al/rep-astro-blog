import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import MarkdownIt from "markdown-it";
import sanitize from "sanitize-html";

const parser = new MarkdownIt();

export const GET: APIRoute = async ({ params, request, site }) => {

    const posts = await getCollection(`posts`);

    return rss({
    stylesheet: '/rss/styles.xsl',
    // `<title>` field in output xml
    title: 'Thiago`s Blog',
    // `<description>` field in output xml
    description: 'Example description',
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#site
    site: site!,

    xmlns: {
      media: 'http://search.yahoo.com/mrss/',
    },
    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items: posts.map(({data, id, body}) => ({ 
        title: data.title,
        pubDate: data.date,
        description: data.description,
        link: `/posts/${id}`,


        content: sanitize(parser.render(body!), {
          allowedTags: sanitize.defaults.allowedTags.concat(['img']),
        }),

        customData: `<media:content
            type="image/${data.image.format === 'jpg' ? 'jpeg' : 'png'}"
            width="${data.image.width}"
            height="${data.image.height}"
            medium="image"
            url="${site + data.image.src}" />
        `,
     })),
    // (optional) inject custom xml
    customData: `<language>en-us</language>`,
  });

};