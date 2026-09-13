import { rentalGuideHTML } from './equipment-rentals.js';
import { clothingGuideHTML } from './equipment-clothing.js';
import { cardoGuideHTML } from './equipment-cardo.js';
import { members } from './members.js';

export function renderEquipment(container) {
  container.innerHTML = `
    <div class="section-intro"><div><p class="eyebrow">07 / EQUIPMENT</p><h2 class="section-title">租裝備・點樣著</h2><p class="muted">富良野只推新富良野王子酒店租借；旭川以 OMO7 為基地另揀。先預留板、雪鞋同頭盔，貼身衣物自己準備。</p></div><span class="tag">2027/3/6–13</span></div>
    <aside class="card warm-card"><h3>先分清楚：租借 ≠ 已預訂</h3><p>今次安排係租頭盔、雪鞋同 snowboard；雪褸、雪褲、內層同手套自行準備。頭盔未必包括喺板＋鞋套裝，要逐人另問尺寸及供應。名單共有 ${members.length} 人，唔好假設即場有齊鞋碼。</p><p class="meta">資料查核：2026/9/13。各項來源及適用雪季見下文；未公布嘅 2026–27 價目、庫存、營業及運送安排，都唔當成已確認。</p></aside>
    <div class="equipment-jumps" role="group" aria-label="裝備指南段落">
      <button type="button" class="button secondary" data-equipment-target="equipment-rentals">邊度租</button>
      <button type="button" class="button secondary" data-equipment-target="equipment-clothing">揀裝備・衣物</button>
      <button type="button" class="button secondary" data-equipment-target="equipment-cardo">Cardo 通訊</button>
    </div>
    <section id="equipment-rentals" class="equipment-block" tabindex="-1" aria-label="租借地點">${rentalGuideHTML()}</section>
    <section id="equipment-clothing" class="equipment-block" tabindex="-1" aria-label="裝備選擇及衣物">${clothingGuideHTML()}</section>
    <section id="equipment-cardo" class="equipment-block" tabindex="-1" aria-label="Cardo 通訊指南">${cardoGuideHTML()}</section>
    <p class="meta"><a class="text-link" href="#prepare">返回出發前個人清單 ↗</a> · <a class="text-link" href="#mountains">雪場、雪票及營運來源 ↗</a></p>`;
  container.querySelectorAll('[data-equipment-target]').forEach(button => {
    button.addEventListener('click', () => {
      const section = container.querySelector(`#${button.dataset.equipmentTarget}`);
      section.scrollIntoView({ behavior: 'instant', block: 'start' });
      section.focus({ preventScroll: true });
    });
  });
}
