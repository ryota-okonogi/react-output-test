import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./style.module.css";

export const TodoList = (props) => {
  /*
    props(↓)は TodoTemplate(src/components/templates/TodoTemplate/index.jsx)から渡ってくる
    todoList={showTodoList}
    handleDeleteTodo={handleDeleteTodo}
  */

  // ↓propsであることを定義
  const { todoList, handleDeleteTodo } = props;

  return (
    <ul className={styles.list}>
      {todoList.map((todo) => (
        <li key={todo.id} className={styles.todo}>
          <span className={styles.task}>{todo.title}</span>
          <div className={styles.far}>
            <FontAwesomeIcon
              icon={faTrashAlt}
              size="lg"
              onClick={() => handleDeleteTodo(todo.id, todo.title)}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

/**
 * @エラー
 * 6/25
 *
 * [NG]
 * export const TodoList = (props) => {
 *
 * [OK]
 * import styles from "./styles.module.css";
 *
 * export const TodoList = (props) => {
 */

/**
 * 削除の実装
 *
 * ＜List.jsx＞
 * 削除用のpropsを用意する
 * 押したボタンのIDを削除用のpropsの引数に渡す
 * 削除用のボタンを用意する(ゴミ箱アイコン)
 *
 */
