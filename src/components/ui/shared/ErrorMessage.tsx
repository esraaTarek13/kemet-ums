type ErrorMessageProps = {
  content: string;
};

export default function ErrorMessage({ content }: ErrorMessageProps) {
  return (
    <div className="w-full h-30 flex justify-center">
      <p className="text-xs text-danger text-center">
        {content ?? "Something went wrong"}
      </p>
    </div>
  );
}
