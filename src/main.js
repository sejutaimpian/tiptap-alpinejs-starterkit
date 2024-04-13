import Alpine from "alpinejs";
import { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";

document.addEventListener("alpine:init", () => {
  Alpine.data("editor", (content) => {
    let editor; // Alpine's reactive engine automatically wraps component properties in proxy objects. Attempting to use a proxied editor instance to apply a transaction will cause a "Range Error: Applying a mismatched transaction", so be sure to unwrap it using Alpine.raw(), or simply avoid storing your editor as a component property, as shown in this example.

    return {
      updatedAt: Date.now(), // force Alpine to rerender on selection change
      init() {
        const _this = this;

        editor = new Editor({
          element: this.$refs.element,
          extensions: [StarterKit],
          editorProps: {
            attributes: {
              class:
                "prose bg-white dark:prose-invert prose-sm sm:prose-base lg:prose-lg mx-auto py-2 px-4 border border-slate-300 focus:outline-none",
            },
          },
          content: content,
          onCreate({ editor }) {
            _this.updatedAt = Date.now();
          },
          onUpdate({ editor }) {
            _this.updatedAt = Date.now();
          },
          onSelectionUpdate({ editor }) {
            _this.updatedAt = Date.now();
          },
        });
      },
      // Functionality
      isActive(type, opts = {}) {
        return editor.isActive(type, opts);
      },
      isLoaded() {
        return editor;
      },
      redo() {
        editor.commands.redo();
      },
      undo() {
        editor.commands.undo();
      },
      // Node & Mark
      setParagraph() {
        this.nodeTitleText = "Normal";
        editor.chain().setParagraph().focus().run();
      },
      toggleHeading(opts) {
        this.nodeTitleText = "H" + opts.level;
        editor.chain().toggleHeading(opts).focus().run();
      },
      toggleBold() {
        editor.chain().toggleBold().focus().run();
      },
      toggleItalic() {
        editor.chain().toggleItalic().focus().run();
      },
      toggleStrike() {
        editor.chain().toggleStrike().focus().run();
      },
      toggleBlockquote() {
        editor.chain().toggleBlockquote().focus().run();
      },
      toggleBulletList() {
        editor.chain().toggleBulletList().focus().run();
      },
      toggleOrderedList() {
        editor.chain().toggleOrderedList().focus().run();
      },
      toggleCode() {
        editor.chain().toggleCode().focus().run();
      },
      toggleCodeBlock() {
        editor.chain().toggleCodeBlock().focus().run();
      },
      save() {
        console.log(editor.getHTML());
      },
      dev() {
        editor.commands.deleteSelection();
      },

      isNodeTitle: false,
      nodeTitleText: "Normal",
    };
  });
});

window.Alpine = Alpine;
Alpine.start();
