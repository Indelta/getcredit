import Header from '@editorjs/header';
import Link from '@editorjs/link';
import Paragraph from '@editorjs/paragraph';
import Image from '@editorjs/image';
import Embed from '@editorjs/embed';
import Table from '@editorjs/table';
import Delimiter from '@editorjs/delimiter';
import List from '@editorjs/list';
import Raw from '@editorjs/raw';

export const editorTools = {
    header: {
        class: Header,
        inlineToolbar: ['link']
    },
    paragraph: {
        class: Paragraph,
        inlineToolbar: true,
        toolbox: true
    },
    list: {
        class: List,
        inlineToolbar: true
    },
    image: {
        class: Image,
        config: {
            endpoints: {
                byFile: '/uploadImage'
            }
        }
    },
    embed: {
        class: Embed,
        inlineToolbar: true
    },
    table: Table,
    linkTool: Link,
    delimiter: Delimiter,
    raw: Raw
}