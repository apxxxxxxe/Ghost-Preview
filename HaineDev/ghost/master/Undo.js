#title = "元に戻す"
#include "include/IO.js"
// Undo 時に保存済みファイルと比較し、一致するようなら保存済みフラグをオンにする

// 動作定義
var MaxLength = 150*1024;   // 処理対象最大文字数．動作が重い場合は小さい値に．無効にする場合はコメントアウト
var IsSequence = false;     // 連続した変更を一括で処理する

var d = Document;
var s = d.Selection;
var bt = d.Text;
var bp = s.GetActivePos();
d.Undo();

// 変更チェック
var at = d.Text;
if (bt == at) {
  Quit();
}

// サイズ制限
var MaxLength;
if (MaxLength != null && at.length > MaxLength) {
  Quit();
}

var t = d.FullName ? IO.LoadFromFile(d.FullName, d.Encoding) : null;

// 連続した変更をまとめる
var IsSequence;
if (IsSequence) {
  var ap = s.GetActivePos();
  var w = at.length - bt.length;
  var y = s.GetActivePointY(mePosLogical);
  if (Math.abs(w) == 1 && Math.abs(ap - bp) <= 1) {
    var ab = null;
    do {
      // 保存済み位置まで戻った場合はそこでひとまとめとする
      if (t === at) {
        d.Saved = true;
        Quit();
      }
      bt = at;
      bp = ap;
      ab = s.GetAnchorPos();
      d.Undo();
      at = d.Text;
      ap = s.GetActivePos();
    } while (at.length - bt.length == w && Math.abs(ap - bp) <= 1 && s.GetActivePointY(mePosLogical) == y);
    // 全て Redo しきった訳ではない場合は戻す
    if (bt != at) {
      d.Redo();
      s.SetAnchorPos(ab);
      s.SetActivePos(bp, true);
    }
  }
}

if (t === at) {
  d.Saved = true;
}