import { useGetWidgets } from "../hooks/usegetWidgets"
import { WidgetsContainer } from "./Homepage.styles";

export function Homepage() {
    const widgets = useGetWidgets();
    return <>Homepage
    <WidgetsContainer>
        {widgets.map((widget) => {
            return <div key={widget.url}>
                {/* <a href={'/app' + widget.url}>{widget.label}</a> */}
                <iframe loading="lazy" scrolling="no" src={widget.url} />
            </div>
        })}
            </WidgetsContainer>
    </>
}