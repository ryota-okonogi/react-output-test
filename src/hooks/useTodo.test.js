import { renderHook } from "@testing-library/react";
import { useTodo } from "./useTodo";
import { act } from "react-dom/test-utils";
import { INIT_TODO_LIST } from "../constants/data";
import { vi } from "vitest";
import { describe, expect, test, beforeEach } from "vitest"

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

  /**
   * @結果判定でチェックする工程の違い
   * [0] → [1] → [0] = 更新, 値のリセット, 〇〇が無い場合〇〇が発生しないこと
   * [1] → [0] = 〇〇した場合、〇〇されないこと, 〇〇がある場合、〇〇が反映される
   */

describe("【Hooksテスト】useApp test", () => { // start
    // 入力フォームからTodoタイトルを追加した際に「入力したタイトルを追加するstateの値が入力値で更新される事」を確認するテスト
  describe("【関数テスト】onChangeAddInputValue", () => { // 関数テスト１
    // addInputValue = 入力したタイトルを追加
    test("【正常系】addInputValueを更新できること", () => { // テスト１
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

  describe("【関数テスト】handleAddTodo", () => { // 関数テスト２
    // 予測値
    let expectTodoList = []; // 予測値 = 配列
    // 引数
    let eventObject = { // letを使うのはここではじめ定義し、以降で使用するから
      target: {
        value: "テスト",
      },
      key: "Enter",
    };

    /**
     * beforeEach = 初期化処理
     * test関数が実行される前に毎回実行される
     * 今回の場合はテスト対象に渡す引数を毎回初期化する
     */
    beforeEach(() => {
      // 引数の初期化
      eventObject = {
        target: {
          value: "テスト",
        },
        key: "Enter",
      };
    });

    test("【正常系】todoList, uniqueIdが更新されること、addInputValueがリセットされること", () => { // テスト２−１
      // 予測値
      const expectTodoTitle = "Todo3";
      expectTodoList = INIT_TODO_LIST.concat({
        id: 3,
        title: expectTodoTitle,
      });
      // 引数
      eventObject.target.value = expectTodoTitle;

      // hooks呼び出し
      const { result } = renderHook(() => useTodo());
      expect(result.current[0].addInputValue).toBe("");
      // hooks関数の実行(addInputValueを更新)
      act(() => result.current[1].onChangeAddInputValue(eventObject));
      expect(result.current[0].addInputValue).toBe(expectTodoTitle);
      // 更新することでexpectTodoTitleが「""」→「期待するタイトル」になることを確認

      // hooks関数の実行: handleAddTodoの実行
      act(() => result.current[1].handleAddTodo(eventObject));
      // 表示用TodoListが予想通り更新されたこと
      expect(result.current[0].showTodoList).toEqual(expectTodoList);
      // 入力値がリセットされたこと
      expect(result.current[0].addInputValue).toBe("");
    });
    test("【正常系】入力値がない場合、処理が発生しないこと", () => { // テスト２−２
      // 予測値
      const expectTodoTitle = "Todo5";
      expectTodoList = INIT_TODO_LIST.concat({
        id: 3,
        title: expectTodoTitle,
      });
      // 引数
      eventObject.target.value = "";
      eventObject.key = "";
      // hooks呼び出し
      const { result } = renderHook(() => useTodo());
      expect(result.current[0].addInputValue).toBe("");
      // hooks関数の実行(addInputValueを更新)
      act(() => result.current[1].onChangeAddInputValue(eventObject));
      expect(result.current[0].addInputValue).toBe("");
      // hooks関数の実行: handleAddTodoの実行
      act(() => result.current[1].handleAddTodo(eventObject));
      // 表示用TodoListが予想通り更新されないこと
      expect(result.current[0].showTodoList).not.toEqual(expectTodoList);
    });

    test("【正常系】検索キーワードがある場合", () => { // テスト２−３
      // TODO: 確認1: 検索結果でshowTodoListが更新されること
    });

    describe("【関数テスト】handleDeleteTodo", () => { // 関数テスト３
      test("【正常系】todoが削除されること", () => { // テスト３−１
        // 引数
        const targetId = 1;
        const targetTitle = "テスト";
        // window.confirmをモック化
        // confirmでOKをクリックした場合
        // https://stackoverflow.com/questions/41732903/stubbing-window-functions-in-jest
        // window.confirm = jest.fn().mockImplementation(() => true);
        window.confirm = vi.fn().mockReturnValueOnce // 値を1回返す
        // 予測値
        expectTodoList = INIT_TODO_LIST.filter((todo) => todo.id !== targetId);
        // hooks呼び出し
        const { result } = renderHook(() => useTodo());
        act(() => result.current[1].handleDeleteTodo(targetId, targetTitle));
        // 表示用TodoListが予想通り更新されないこと
        expect(result.current[0].showTodoList).toEqual(expectTodoList);
      });

      test("【正常系】confirmでキャンセルをクリックした場合、todoが削除されないこと", () => { // テスト３−２
        // 引数
        const targetId = 1;
        const targetTitle = "テスト";
        // window.confirmをモック化
        // confirmでOKをクリックした場合
        window.confirm = vi.fn().mockReturnValueOnce(false); // 偽値のチェックは引数にfalseを渡す
        // 予測値
        expectTodoList = INIT_TODO_LIST;
        // hooks呼び出し
        const { result } = renderHook(() => useTodo());
        act(() => result.current[1].handleDeleteTodo(targetId, targetTitle));
        // 表示用Todoリストが予想通り更新されないこと
        expect(result.current[0].showTodoList).toEqual(expectTodoList);
      });

      test("【正常系】検索キーワードがある場合", () => { // テスト３−３
        // TODO: 確認: 検索結果でshowTodoListが更新されること (showTodoListへもTodo削除処理の結果が反映されること)
      });
    });
  });

  describe("【関数テスト】handleChangeSearchKeyword", () => { // 関数テスト４
    test("【正常系】検索キーワードがある場合、検索された結果が反映される", () => { // テスト４−１
      // 予測値
      const expectValue = [INIT_TODO_LIST[0]];
      // 引数
      const eventObject = {
        target: {
          value: "Todo1",
        },
      };
      // expectValueで[INIT_TODO_LIST[0]を、eventObjectで"Todo1"を設定するのは双方が同一データとして一致するから。

      // hooks呼び出し
      const { result } = renderHook(() => useTodo());
      // hooks関数の実行
      act(() => result.current[1].handleChangeSearchKeyword(eventObject));
      // 結果判定
      expect(result.current[0].showTodoList).toEqual(expectValue);
    });
    test("【正常系】検索キーワードがない場合、元のTodoリストが反映される", () => { // テスト４−２
      // 予測値
      const expectValue = INIT_TODO_LIST;
      // 引数
      const eventObject = {
        target: {
          value: "",
        },
      };

      // hooks呼び出し
      const { result } = renderHook(() => useTodo());
      // hooks関数の実行
      act(() => result.current[1].handleChangeSearchKeyword(eventObject));
      // 結果判定
      expect(result.current[0].showTodoList).toEqual(expectValue);
    });
  });
4});
