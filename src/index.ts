import joplin from 'api'
import { ContentScriptType } from 'api/types'
import { MenuItem, MenuItemLocation } from 'api/types'

const Config = {
    MarkdownFenceId: 'bytefield',
}
const Templates = {
    Fence: '```bytefield\n\n```',
}
const CommandsId = {
    Fence: 'bytefield-svg-fenceTemplate',
}

joplin.plugins.register({
    onStart: async function() {

        // Register command
        await joplin.commands.register({
            name: CommandsId.Fence,
            label: 'Insert bytefield block template',
            iconName: 'fa fa-pencil',
            execute: async () => {
                await joplin.commands.execute('insertText', Templates.Fence)
            },
        })

        // Register menu
        const commandsSubMenu: MenuItem[] = Object.values(CommandsId).map(command => ({ commandName: command }))
        await joplin.views.menus.create('menu-bytefield-svg', 'Bytefield-svg', commandsSubMenu, MenuItemLocation.Tools)


        // Content Scripts
        await joplin.contentScripts.register(
            ContentScriptType.MarkdownItPlugin,
            Config.MarkdownFenceId,
            './contentScript/contentScript.js',
        )

    },
})
