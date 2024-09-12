import { useFormStatus } from "react-dom";
import ShinyButton from "../magicui/shiny-button";

interface ClaimButtonProps {
  title: string;
  loadingTitle: string;
  className?: string;
  onClick?: () => void;
}

export function SubmitButton({
  title,
  loadingTitle,
  className,
  onClick,
}: ClaimButtonProps) {
  const { pending } = useFormStatus();
  return (
    <>
      <ShinyButton
        onClick={onClick}
        className={className}
        text={pending ? loadingTitle : title}
      />
    </>
  );
}
