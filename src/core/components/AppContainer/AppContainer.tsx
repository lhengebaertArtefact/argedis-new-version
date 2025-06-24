import { SCREEN_DIMENSIONS } from "@/shared/constants/dimensions";
import { ReactNode } from "react";

interface AppContainerProps {
  children: ReactNode;
}

export default function AppContainer({ children }: AppContainerProps) {
  return (
    <div
      className="mx-auto bg-gray-50 overflow-hidden"
      style={{
        width: `${SCREEN_DIMENSIONS.WIDTH}px`,
        height: `${SCREEN_DIMENSIONS.HEIGHT}px`,
      }}
    >
      {children}
    </div>
  );
}
