export default function InfoText({ children }) {
  const {
    props: { children: text },
  } = children;
  return <p className='p-6 bg-yellow-200 border-2'>{text}</p>;
}
