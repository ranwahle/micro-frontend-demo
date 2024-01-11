import { useState } from "react";

interface Widget {
    label: string;
    url: string;
}

export function useGetWidgets() {
    const [widgets, setWidgets] = useState<Widget[]>([])
    fetch('/shellserver/widgets-list')
        .then((response) => response.json())
        .then((result) => {
            result.forEach((widget: Widget) => {
                if (!widget.url.endsWith('/')) {
                    widget.url = `${widget.url}/`;
                }
            });
            if (widgets.length === 0) {
                setWidgets(result);
            }
        });
    return widgets;

}