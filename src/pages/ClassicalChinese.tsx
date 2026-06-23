import React from "react";
import { Card } from "../components/ui/shared";

export default function ClassicalChinese({ openApp }: { openApp: (id: string) => void }) {
  return (
    <div className="space-y-6 max-w-4xl animate-in slide-in-from-bottom-2 duration-500">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-stone-900">📜 文言文字義比較</h1>
        <p className="text-zinc-500">國中會考必考題型！學會虛詞用法，文言文不再難懂</p>
      </div>

      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-stone-900">📖 八大虛詞總覽</h2>
          <button
            onClick={() => openApp("quiz.classical-chinese")}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all active:scale-95"
          >
            🚀 開始測驗
          </button>
        </div>
        <p className="text-sm text-zinc-500">
          共 30 題，涵蓋國中常考的文言虛詞，每題都有詳細解析
        </p>
      </Card>

      {/* 於 */}
      <Card className="p-6 space-y-3">
        <h3 className="text-lg font-bold text-blue-700">① 於 — 6 種常見用法</h3>
        <div className="space-y-2 text-sm">
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="font-bold text-stone-800">(1) 在（地點/方面）</p>
            <p className="text-zinc-600">例：然侍衛之臣不懈<b>於</b>內 = 在朝廷內部</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="font-bold text-stone-800">(2) 向（對象）</p>
            <p className="text-zinc-600">例：余將告<b>於</b>蒞事者 = 向主管官員報告</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="font-bold text-stone-800">(3) 從（起點）</p>
            <p className="text-zinc-600">例：舜發<b>於</b>畎畝之中 = 從田畝中被提拔</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="font-bold text-stone-800">(4) 比（比較）</p>
            <p className="text-zinc-600">例：苛政猛<b>於</b>虎 = 比老虎還凶猛</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="font-bold text-stone-800">(5) 對於</p>
            <p className="text-zinc-600">例：不戚戚<b>於</b>貧賤 = 對貧賤不憂愁</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="font-bold text-stone-800">(6) 到</p>
            <p className="text-zinc-600">例：欲信大義<b>於</b>天下 = 向天下伸張大義</p>
          </div>
        </div>
      </Card>

      {/* 之 */}
      <Card className="p-6 space-y-3">
        <h3 className="text-lg font-bold text-green-700">② 之 — 5 種常見用法</h3>
        <div className="space-y-2 text-sm">
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="font-bold text-stone-800">(1) 代詞（他/她/它/這件事）</p>
            <p className="text-zinc-600">例：肉食者謀<b>之</b> = 謀劃這件事</p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="font-bold text-stone-800">(2) 的（結構助詞）</p>
            <p className="text-zinc-600">例：操蛇<b>之</b>神 = 拿蛇的神</p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="font-bold text-stone-800">(3) 去、往（動詞）</p>
            <p className="text-zinc-600">例：吾欲<b>之</b>南海 = 我想要去南海</p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="font-bold text-stone-800">(4) 主謂之間（取消獨立性）</p>
            <p className="text-zinc-600">例：蓮<b>之</b>出淤泥而不染 = 蓮花從污泥中長出</p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="font-bold text-stone-800">(5) 賓語前置標記</p>
            <p className="text-zinc-600">例：何陋<b>之</b>有 = 有什麼簡陋的呢</p>
          </div>
        </div>
      </Card>

      {/* 其 */}
      <Card className="p-6 space-y-3">
        <h3 className="text-lg font-bold text-purple-700">③ 其 — 4 種常見用法</h3>
        <div className="space-y-2 text-sm">
          <div className="p-3 bg-purple-50 rounded-lg">
            <p className="font-bold text-stone-800">(1) 他的/她的/它的/他們的（代詞）</p>
            <p className="text-zinc-600">例：安求<b>其</b>能千里也 = 怎能要求牠日行千里</p>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            <p className="font-bold text-stone-800">(2) 難道（反問語氣）</p>
            <p className="text-zinc-600">例：<b>其</b>真無馬邪 = 難道真的沒有千里馬嗎</p>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            <p className="font-bold text-stone-800">(3) 恐怕/大概（推測語氣）</p>
            <p className="text-zinc-600">例：<b>其</b>真不知馬也 = 恐怕是真的不識馬</p>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            <p className="font-bold text-stone-800">(4) 將（語氣副詞）</p>
            <p className="text-zinc-600">例：<b>其</b>如土石何 = 又能把土石怎麼樣</p>
          </div>
        </div>
      </Card>

      {/* 以 */}
      <Card className="p-6 space-y-3">
        <h3 className="text-lg font-bold text-orange-700">④ 以 — 5 種常見用法</h3>
        <div className="space-y-2 text-sm">
          <div className="p-3 bg-orange-50 rounded-lg">
            <p className="font-bold text-stone-800">(1) 因為</p>
            <p className="text-zinc-600">例：扶蘇<b>以</b>數諫故 = 因為屢次勸諫的緣故</p>
          </div>
          <div className="p-3 bg-orange-50 rounded-lg">
            <p className="font-bold text-stone-800">(2) 用、憑藉</p>
            <p className="text-zinc-600">例：<b>以</b>刀劈狼首 = 用刀劈狼的頭</p>
          </div>
          <div className="p-3 bg-orange-50 rounded-lg">
            <p className="font-bold text-stone-800">(3) 按照</p>
            <p className="text-zinc-600">例：策之不以<b>其</b>道 = 不按照正確的方法對待牠</p>
          </div>
          <div className="p-3 bg-orange-50 rounded-lg">
            <p className="font-bold text-stone-800">(4) 認為</p>
            <p className="text-zinc-600">例：皆<b>以</b>美於徐公 = 都認為比徐公美</p>
          </div>
          <div className="p-3 bg-orange-50 rounded-lg">
            <p className="font-bold text-stone-800">(5) 把（介詞）</p>
            <p className="text-zinc-600">例：多以書假余 = 多把書借給我</p>
          </div>
        </div>
      </Card>

      {/* 而 */}
      <Card className="p-6 space-y-3">
        <h3 className="text-lg font-bold text-red-700">⑤ 而 — 4 種常見用法</h3>
        <div className="space-y-2 text-sm">
          <div className="p-3 bg-red-50 rounded-lg">
            <p className="font-bold text-stone-800">(1) 順承（然後）</p>
            <p className="text-zinc-600">例：溫故<b>而</b>知新 = 複習舊知<b>然後</b>得到新體會</p>
          </div>
          <div className="p-3 bg-red-50 rounded-lg">
            <p className="font-bold text-stone-800">(2) 轉折（但是、可是）</p>
            <p className="text-zinc-600">例：人不知<b>而</b>不慍 = 人家不了解我<b>但是</b>我不生氣</p>
          </div>
          <div className="p-3 bg-red-50 rounded-lg">
            <p className="font-bold text-stone-800">(3) 並列/遞進（而且）</p>
            <p className="text-zinc-600">例：敏<b>而</b>好學 = 聰敏<b>而且</b>好學</p>
          </div>
          <div className="p-3 bg-red-50 rounded-lg">
            <p className="font-bold text-stone-800">(4) 修飾（連接狀語）</p>
            <p className="text-zinc-600">例：吾恂恂<b>而</b>起 = 小心地起來</p>
          </div>
        </div>
      </Card>

      {/* 乃 */}
      <Card className="p-6 space-y-3">
        <h3 className="text-lg font-bold text-cyan-700">⑥ 乃 — 4 種常見用法</h3>
        <div className="space-y-2 text-sm">
          <div className="p-3 bg-cyan-50 rounded-lg">
            <p className="font-bold text-stone-800">(1) 於是、就</p>
            <p className="text-zinc-600">例：<b>乃</b>重修岳陽樓 = 於是重新修建岳陽樓</p>
          </div>
          <div className="p-3 bg-cyan-50 rounded-lg">
            <p className="font-bold text-stone-800">(2) 是（判斷詞）</p>
            <p className="text-zinc-600">例：當立者<b>乃</b>公子扶蘇 = 應當立的是公子扶蘇</p>
          </div>
          <div className="p-3 bg-cyan-50 rounded-lg">
            <p className="font-bold text-stone-800">(3) 竟然</p>
            <p className="text-zinc-600">例：<b>乃</b>不知有漢 = 竟然不知道有漢朝</p>
          </div>
          <div className="p-3 bg-cyan-50 rounded-lg">
            <p className="font-bold text-stone-800">(4) 你的</p>
            <p className="text-zinc-600">例：家祭無忘告<b>乃</b>翁 = 家祭時別忘了告訴你父親</p>
          </div>
        </div>
      </Card>

      {/* 且 */}
      <Card className="p-6 space-y-3">
        <h3 className="text-lg font-bold text-pink-700">⑦ 且 — 3 種常見用法</h3>
        <div className="space-y-2 text-sm">
          <div className="p-3 bg-pink-50 rounded-lg">
            <p className="font-bold text-stone-800">(1) 況且、再說</p>
            <p className="text-zinc-600">例：<b>且</b>焉置土石 = 況且要把土石放在哪裡</p>
          </div>
          <div className="p-3 bg-pink-50 rounded-lg">
            <p className="font-bold text-stone-800">(2) 將、將要</p>
            <p className="text-zinc-600">例：年<b>且</b>九十 = 年紀將近九十</p>
          </div>
          <div className="p-3 bg-pink-50 rounded-lg">
            <p className="font-bold text-stone-800">(3) 姑且</p>
            <p className="text-zinc-600">例：存者<b>且</b>偷生 = 活著的人姑且偷生</p>
          </div>
        </div>
      </Card>

      {/* Tips */}
      <Card className="p-6 space-y-3 border-2 border-yellow-300 bg-yellow-50">
        <h3 className="text-lg font-bold text-yellow-800">💡 答題技巧</h3>
        <div className="space-y-2 text-sm text-stone-700">
          <p>1. <b>先判斷詞性</b>：是代詞、介詞、連詞還是副詞？</p>
          <p>2. <b>代入翻譯</b>：把各選項的「於/之/其…」翻譯成白話，看哪個最通順</p>
          <p>3. <b>注意位置</b>：動詞後面通常是代詞；名詞前面通常是「的」</p>
          <p>4. <b>看上下文</b>：同樣的字在不同句子裡意思可能完全不同</p>
          <p>5. <b>特殊句式</b>：賓語前置（何陋之有）、定語後置（馬之千里者）要特別注意</p>
        </div>
      </Card>

      <div className="text-center pb-6">
        <button
          onClick={() => openApp("quiz.classical-chinese")}
          className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-xl shadow-lg shadow-blue-500/30 transition-all active:scale-95"
        >
          📝 開始做 30 題測驗！
        </button>
      </div>
    </div>
  );
}
