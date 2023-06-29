// import文でTodoTodoTemplateを読み込む
import { TodoTemplate } from "../components/templates/TodoTemplate";

// Todopageコンポーネントを実行した際の戻り値として、TodoTemplateが呼び出し元のmain.jsxに返る
export const TodoPage = () => <TodoTemplate />;
