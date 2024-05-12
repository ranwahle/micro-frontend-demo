import { useGetWidgets } from "../hooks/useGetWidgets";
import { WidgetContainer, WidgetsContainer } from "./Homepage.styles";

export function Homepage() {
    const widgets = useGetWidgets();

    const shoupdWeOperateTheWashingMachine = () => { 

        const frames = Array.from(document.querySelectorAll('iframe'));
        const status = (frames[0].contentWindow as unknown as { getData: () => string }).getData();
        const numberOfClothes = (frames[1].contentWindow as unknown as { getData: () => number | undefined }).getData();
        if (status === 'FREE' && numberOfClothes && numberOfClothes > 0) {
            alert('You can operate the washing machine');
        } else {
            alert('You can not operate the washing machine');
        }
    }

    return <>Homepage
    <WidgetsContainer>
        {widgets.map((widget) => {
            return <WidgetContainer key={widget.url}>
                {widget.label}
                <iframe loading="lazy" scrolling="no" src={widget.url} />
            </WidgetContainer>
        })}
            </WidgetsContainer>

        <button onClick={shoupdWeOperateTheWashingMachine}>Should we operate the waching machine</button>
    </>
}