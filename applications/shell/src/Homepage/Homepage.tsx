import { useGetWidgets } from "../hooks/useGetWidgets"
import { WidgetContainer, WidgetsContainer } from "./Homepage.styles";

export function Homepage() {
    const widgets = useGetWidgets();
    return <>Homepage
    <WidgetsContainer>
        {widgets.map((widget) => {
            return <WidgetContainer key={widget.url}>
                {widget.label}
                <iframe loading="lazy" scrolling="no" src={widget.url} />
            </WidgetContainer>
        })}
            </WidgetsContainer>
    </>
}