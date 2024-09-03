import { useFormStatus } from "react-dom";
import ShinyButton from "../magicui/shiny-button";

interface ClaimButtonProps {
  title: string;
  loadingTitle: string;
  className?: string;
}

export function ClaimButton({
  title,
  loadingTitle,
  className,
}: ClaimButtonProps) {
  const { pending } = useFormStatus();
  return (
    <>
      <ShinyButton
        className={className}
        text={pending ? loadingTitle : title}
      />
    </>
  );
}
