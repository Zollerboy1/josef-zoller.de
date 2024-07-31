import { defineConfig } from 'astro/config'
import { h } from 'hastscript'
import { fromHtml } from 'hast-util-from-html'
import { icons } from '@iconify-json/material-symbols'
import { getIconData, iconToSVG } from '@iconify/utils'

import vercel from '@astrojs/vercel/serverless'
import tailwind from '@astrojs/tailwind'
import icon from 'astro-icon'

function hastIcon(name, spanClass, title) {
    const iconData = getIconData(icons, name)
    if (!iconData) {
        throw new Error(`Icon "${name}" is missing`)
    }

    const fullName = `${icons.prefix}:${name}`

    const id = `ai:${fullName}`

    const renderData = iconToSVG(iconData)
    const props = {
        ...renderData.attributes,
        width: '1.2em',
        height: '1.2em',
        'data-icon': fullName,
    }

    return h(
        'span',
        { class: spanClass },
        h('svg', props, [
            h('title', title),
            h('symbol', { id }, fromHtml(renderData.body, { fragment: true })),
            h('use', { 'xlink:href': `#${id}` }),
        ])
    )
}

// https://astro.build/config
export default defineConfig({
    output: 'server',
    adapter: vercel({
        webAnalytics: { enabled: true },
        imageService: true,
        imagesConfig: {
            sizes: [640, 750, 860, 984],
            domains: [],
            minimumCacheTTL: 60,
            formats: ['image/avif', 'image/webp'],
        },
        isr: true,
    }),
    integrations: [tailwind(), icon()],
    markdown: {
        shikiConfig: {
            transformers: [
                {
                    pre(node) {
                        node.children.push(
                            h(
                                'button',
                                {
                                    class: 'copy',
                                    'data-code': this.source,
                                    onclick: `
                                  navigator.clipboard.writeText(this.dataset.code);
                                  this.classList.add('copied');
                                  setTimeout(() => this.classList.remove('copied'), 5000)
                                `,
                                },
                                [
                                    hastIcon(
                                        'content-copy-outline-rounded',
                                        'ready',
                                        'Copy to clipboard'
                                    ),
                                    hastIcon(
                                        'check-rounded',
                                        'success',
                                        'Copied!'
                                    ),
                                ]
                            )
                        )
                    },
                },
            ],
        },
    },
})
