type Props = {
  message: string;
};
export default function LyricsLoading({ message }: Props) {
  return (
    <div className="flex items-center gap-2">
      <span className="loading loading-bars loading-xl"></span>
      <p>{message}</p>
    </div>
  );
}
