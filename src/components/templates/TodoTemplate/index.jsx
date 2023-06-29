import { InputForm } from "../../atoms/InputForm";
import { AddTodo } from "../../organisms/AddTodo";
import { TodoList } from "../../organisms/TodoList";
import styles from "./style.module.css";
import { useTodo } from "../../../hooks/useTodo";

// カスタムフックから状態とロジックを呼び出してコンポーネントにあてがう
/*
returnで返る配列の中にオブジェクトである状態とロジックを書く
＝＞ そうしないと右記のエラーが発生する → ':' が必要です。
*/

export const TodoTemplate = () => {

const [
    {
      addInputValue, // 入力したタイトルを追加
      searchKeyword, // 検索キーワード
      showTodoList, // 更新後のTodoList表示
    },
    {
      onChangeAddInputValue, // addInputValueの変更処理
      handleAddTodo, // Todo新規登録処理
      handleDeleteTodo, // Todo削除処理
      handleChangeSearchKeyword, // 検索キーワード更新処理
    },
  ] = useTodo();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Todo List</h1>
      <section className={styles.common}>
        <AddTodo
          addInputValue={addInputValue}
          onChangeTodo={onChangeAddInputValue}
          handleAddTodo={handleAddTodo}
        />
      </section>
      <section className={styles.common}>
        <InputForm
          inputValue={searchKeyword}
          placeholder={"Search Keyword"}
          handleChangeValue={handleChangeSearchKeyword}
        />
      </section>
      <section className={styles.common}>
        {showTodoList.length > 0 && (
          <TodoList
            todoList={showTodoList}
            handleDeleteTodo={handleDeleteTodo}
          />
        )}
      </section>
    </div>
  );
};
