import Markdown from "react-markdown";
export default function CostumMarkdown({ children }: { children: string }) {
    const string = children.replace(/\n/gi, "\n\n")
    return <>
        <Markdown>
            {string}
        </Markdown>
    </>
}