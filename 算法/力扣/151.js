/** middle 翻转字符串里的单词
 * 给你一个字符串 s ，逐个翻转字符串中的所有 单词 。

  单词 是由非空格字符组成的字符串。s 中使用至少一个空格将字符串中的 单词 分隔开。

  请你返回一个翻转 s 中单词顺序并用单个空格相连的字符串。

  输入字符串 s 可以在前面、后面或者单词间包含多余的空格。
  翻转后单词间应当仅用一个空格分隔。
  翻转后的字符串中不应包含额外的空格。

  输入：s = "the sky is blue"
  输出："blue is sky the"

  输入：s = "  hello world  "
  输出："world hello"
  解释：输入字符串可以在前面或者后面包含多余的空格，但是翻转后的字符不能包括。

  输入：s = "a good   example"
  输出："example good a"
  解释：如果两个单词间有多余的空格，将翻转后单词间的空格减少到只含一个。

  输入：s = "  Bob    Loves  Alice   "
  输出："Alice Loves Bob"

  输入：s = "Alice does not even like bob"
  输出："bob like even not does Alice"
 */
function reverseWords(s) {
  const list = s.split('')
  for (let i = 0; i < list.length; i++) {
    const char = list[i];
    if (char === '') continue
    
  }
}