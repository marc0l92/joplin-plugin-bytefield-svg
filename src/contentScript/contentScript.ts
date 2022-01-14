import * as MarkdownIt from "markdown-it"
import bytefieldSvg = require("bytefield-svg")

const fenceNameRegExp = /^bytefield(-svg)?$/i

export default function (context: { contentScriptId: string }) {
    return {
        plugin: function (markdownIt: MarkdownIt, _options) {
            const defaultRender = markdownIt.renderer.rules.fence || function (tokens, idx, options, env, self) {
                return self.renderToken(tokens, idx, options)
            }

            markdownIt.renderer.rules.fence = function (tokens, idx, options, env, self) {
                const token = tokens[idx]
                // console.log('token', token)
                if (!fenceNameRegExp.test(token.info)) return defaultRender(tokens, idx, options, env, self)
                return `
                <div class="bytefield-svg-container">
                    ${bytefieldSvg(token.content, { embedded: true })}
                </div>
                `
            }
        },
        assets: function () {
            return []
        },
    }
}
