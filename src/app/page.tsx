import TodoList from '@/components/TodoList';

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <TodoList />
    </div>
  );
}