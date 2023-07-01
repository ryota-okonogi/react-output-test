import { renderHook } from "@testing-library/react";
import { useTodo } from "./useTodo";
import { act } from "react-dom/test-utils";
import { INIT_TODO_LIST } from "../constants/data";

/**
 * @テスト関数
 * describe(name, fn) = 「テストする対象」を書く
 * test(name, fn) = 「テストで期待する結果」を書く
 * expect() = テスト結果を評価する
 * act = stateの更新関数を呼ぶ
 * →「型はvoid or undefindを返す」ことを定義
 */

  /**
   * @順序
   * 対象(describe)
   * 期待する結果(test)
   * 期待する値を定義(const, letなど)
   * 期待する値が来るか確認(処理内容)
   */

describe("【Hooksテスト】useApp test", () => { // start
    // 入力フォームからTodoタイトルを追加した際に入力したタイトルを追加するstateの値が入力値で更新される事を確認するテスト
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
      // 入力したタイトルを追加するstateの値が１の時はeventObjectを発生させる
      expect(result.current[0].addInputValue).toBe(expectValue);
      /**
       *
       * ＜テスト結果の評価(言語化)＞
       *
       * 更新後のテスト結果 = 入力したタイトルを追加するstateの値が０の時はexpectValueが来ること
       *
       * 0 = ""
       * 1 = eventObject(抽象化されたexpectValue)
       * 更新後の0 = expectValue(実際のexpectValue)
       *
       */
    });
  });
});
