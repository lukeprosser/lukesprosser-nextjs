export default function InfoText({ children }) {
  return (
    <p className='p-6 text-gray-800 bg-indigo-200 dark:prose-code:text-gray-800'>
      {children.props.children}
    </p>
  );
}
