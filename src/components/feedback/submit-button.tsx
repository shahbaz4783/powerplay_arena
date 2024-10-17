import { useFormStatus } from "react-dom";
import ShinyButton from "../magicui/shiny-button";
import { LoadingOverlay } from "@/src/components/shared/loading-overlay";

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
    <div>
      <ShinyButton onClick={onClick} className={className} text={title} />
      {pending && (
        <LoadingOverlay initialMessage="Submitting your request..." />
      )}
    </div>
  );
}
