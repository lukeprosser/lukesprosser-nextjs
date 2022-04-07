export default function InfoText({ children }) {
  return (
    <p className='p-6 text-gray-800 bg-indigo-200'>{children.props.children}</p>
  );
}
