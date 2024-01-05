import { Navbar } from "../Navbar/Navbar";
import { FrameContainer } from "./Layout.styles";

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <FrameContainer>
            <Navbar />
            <main>{children}</main>
            </FrameContainer>
    );
}