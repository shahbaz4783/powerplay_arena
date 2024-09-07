import { Card, CardContent } from "@/src/components/ui/card";

interface CommentaryProps {
  commentary: string[];
}

export function Commentary({ commentary }: CommentaryProps) {
  return (
    <Card className="bg-gray-800 border-gray-700 mt-4">
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2">Commentary</h3>
        <ul className="space-y-1 max-h-32 overflow-y-auto">
          {commentary.map((text, index) => (
            <li key={index} className="text-sm">
              {text}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
