export default function TextSection({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <>
      <h2 className='text-lg font-bold'>{title}</h2>
      <p className='pl-4'>{text}</p>
    </>
  );
}
