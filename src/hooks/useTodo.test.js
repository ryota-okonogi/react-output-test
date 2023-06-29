import { renderHook } from "@testing-library/react";
import { useTodo } from "./useTodo";
import { act } from "react-dom/test-utils";

/**
 * @テスト関数
 * describe(name, fn) = テストする対象を書く
 * test(name, fn) = テストで期待する結果を書く
 * expect() = テスト結果を評価する
 * act = 「型はvoid or undefindを返す」ことを定義
 */

  /**
   * @順序
   * 対象
   * 期待する結果
   * 期待する値を定義
   * eventObjectを発生させ、期待する値が来るかを定義
   */

describe("【Hooksテスト】useApp test", () => { // start
  describe("【関数テスト】onChangeAddInputValue", () => { // 関数テスト１
    test("【正常系】addInputValueを更新できること", () => { // addInputValue = 入力したタイトルを追加
      const expectValue = "テスト";
      // 引数
      const eventObject = {
        target: {
          value: expectValue,
        },
      };
      // hooks呼び出し
      const { result } = renderHook(() => useTodo()); // renderHook = テストファイルの中でもhooksを呼ぶことができるテスト関数
      expect (result.current[0].addInputValue).toBe(""); // 入力したタイトルを追加するstateの値が０の時は空文字であること
      // hooks関数の実行
      act(() => result.current[1].onChangeAddInputValue(eventObject));
      // actを利用して更新用関数を呼ぶ
      // 入力したタイトルを追加するstateの値が１の時はeventObjectを実行する
      expect(result.current[0].addInputValue).toBe(expectValue);
       // テスト結果の評価
       // 更新後のテスト結果は、入力したタイトルを追加するstateの値が０の時はexpectValueが来ること
    });
  });

  describe("【関数テスト】handleAddTodo", () => { // 関数テスト２
    
  })
});

// const onChangeAddInputValue = (e) => setAddInputValue(e.target.value); // 関数テスト１

// // Todo新規登録処理(handleAddTodo)
// const handleAddTodo = (e) => { // 関数テスト２
//   // Enterキーが押された時にTodoを追加
//   if (e.key === "Enter" && addInputValue !== "") { // [条件] Enterキーを押すイベントが発生した時 + 入力値が空でない場合
//     const nextUniqueId = uniqueId + 1; // nextUniqueId = 元の配列の要素数 + 1

//     /**
//      * Todo追加処理: 元の配列を破壊しないように配列のコピーを作成して、その値でstateを更新する
//      * スプレッド構文を使用する
//      */
//     const newTodoList = [
//       ...originTodoList, // 元の配列を展開
//       {
//         id: nextUniqueId, // 元の配列に新規登録するTodoを足したid
//         title: addInputValue, // 入力値がそのままタイトルになる
//       },
//     ];
//     setOriginTodoList(newTodoList); // 新規登録によって追加したTodoを含めたものを新たな配列として生成する

//     // 採番IDを更新 ← 更新用関数のsetUniqueIdで、元の配列の要素数 + 1 する
//     setUniqueId(nextUniqueId);
//     // todo追加後、入力値をリセット
//     setAddInputValue(""); // 入力したタイトルを追加する処理に空文字を入れることで「入力値をリセット」することが可能になる
//   }
// };

// // Todo削除処理
// const handleDeleteTodo = (targetId, targetTitle) => { // 関数テスト３
//   if (window.confirm(`「${targetTitle}」のtodoを削除しますか？`)) {
//     const newTodoList = originTodoList.filter((todo) => todo.id !== targetId);
//     setOriginTodoList(newTodoList);
//   }
// };

// // 検索キーワード更新処理
// const handleChangeSearchKeyword = (e) => setSearchKeyword(e.target.value);
