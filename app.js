async function load() {
  const d = await fetch('dashboard-data.json').then((r) => r.json());
  document.getElementById('updated').textContent = 'Cập nhật: ' + new Date(d.updatedAt).toLocaleString('vi-VN');

  const kpis = [
    ['Tồn đầu kỳ', d.kpi.tonDau], ['Tổng xuất', d.kpi.tongXuat],
    ['Tồn cuối kỳ', d.kpi.tonCuoi], ['Số mặt hàng', d.kpi.soMatHang],
    ['MST chờ xác nhận', d.mstPendingCount],
  ];
  document.getElementById('kpis').innerHTML = kpis
    .map(([l, v]) => `<div class="card"><div class="v">${v.toLocaleString('vi-VN')}</div><div class="l">${l}</div></div>`)
    .join('');

  const alerts = [...d.hetHang.map((i) => [i, 'het', 'Hết hàng']), ...d.sapHet.map((i) => [i, 'sap', 'Sắp hết'])];
  document.getElementById('alerts').innerHTML = alerts.length
    ? `<table><tr><th>Mã</th><th>Tên</th><th>Tồn</th><th>Trạng thái</th></tr>${
        alerts.map(([i, cls, txt]) => `<tr><td>${i.maHang}</td><td>${i.tenHang}</td><td>${i.tonCuoi}</td><td class="${cls}">${txt}</td></tr>`).join('')
      }</table>`
    : '<p>Không có.</p>';

  document.getElementById('maloi').innerHTML = d.maLoi.length
    ? `<table><tr><th>Mã lỗi</th><th>Tên hàng</th><th>Số lần</th></tr>${
        d.maLoi.map((m) => `<tr><td>${m.maHang}</td><td>${m.tenHang}</td><td>${m.soLan}</td></tr>`).join('')
      }</table>`
    : '<p>Không có mã lỗi.</p>';

  const items = d.items;
  const render = (list) => {
    document.getElementById('table').innerHTML =
      `<table><tr><th>Mã</th><th>Tên</th><th>ĐVT</th><th>Tồn đầu</th><th>Xuất</th><th>Tồn cuối</th></tr>${
        list.map((i) => `<tr><td>${i.maHang}</td><td>${i.tenHang}</td><td>${i.dvt}</td><td>${i.tonDau}</td><td>${i.tongXuat}</td><td>${i.tonCuoi}</td></tr>`).join('')
      }</table>`;
  };
  render(items);
  document.getElementById('q').addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    render(items.filter((i) => i.maHang.toLowerCase().includes(q) || i.tenHang.toLowerCase().includes(q)));
  });
}
load();
