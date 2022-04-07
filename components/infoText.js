export default function InfoText({ children }) {
  return (
    <p className='p-6 bg-yellow-200 border-2'>{children.props.children}</p>
  );
}
