const sl = document.getElementById("sl");
const rad = document.getElementById("rad");
const gap = document.getElementById("gap");
const cv = document.getElementById("cv");
const cx = cv.getContext("2d");

function preset(mode) {
  if (mode === "assisted") {
    sl.value = 100;
    rad.value = 45;
    gap.value = 2;
  } else {
    sl.value = 10;
    rad.value = 35;
    gap.value = 32;
  }
  draw();
}

function draw() {
  const q = sl.value / 100;
  const R = Number(rad.value);
  const g = Number(gap.value);
  const curvPenalty = Math.max(0, (90 - R) / 60) * 0.32 * (1 - 0.75 * q);
  const gapPenalty = (g / 40) * 0.48 * (1 - 0.45 * q);
  const cqi = Math.max(0.05, Math.min(0.98, 0.88 * q + 0.12 - curvPenalty - gapPenalty));
  const r = Number((10.2 * (1 - 0.82 * cqi)).toFixed(2));
  const b = Number((1.85 + 2.55 * cqi).toFixed(2));
  const zEff = Number((0.42 + 1.08 * cqi).toFixed(2));
  const pass = cqi >= 0.65;

  document.getElementById("sl-v").textContent = (q * 6).toFixed(1) + " mm";
  document.getElementById("rad-v").textContent = R + " mm" + (R >= 120 ? " (Near-Planar)" : " (Curved)");
  document.getElementById("gap-v").textContent = g + " \u03bcm";
  document.getElementById("z-val").textContent = zEff.toFixed(2) + " MRayl";
  document.getElementById("v1").textContent = r.toFixed(2) + " kPa";
  document.getElementById("v2").textContent = b.toFixed(2) + " kPa";
  document.getElementById("cqi-val").textContent = cqi.toFixed(2);

  const el = document.getElementById("v3");
  el.textContent = pass ? "ACCEPTED" : "REJECTED";
  el.className = "kpi-val " + (pass ? "pass" : "fail");

  const cvPct = Number((1.4 + 8.8 * (1 - cqi)).toFixed(1));
  const rescans = Number((1.0 + 1.8 * (1 - cqi)).toFixed(1));
  const saved = Math.max(0, Number(((2.4 - rescans) * 8.2).toFixed(1)));
  document.getElementById("cv-pct").textContent = cvPct.toFixed(1) + "%";
  document.getElementById("re-scans").textContent = rescans.toFixed(1) + "x" + (pass ? " (Single Pass)" : " (Retry Drift)");
  document.getElementById("time-saved").textContent = "+" + saved.toFixed(1) + " hrs";

  cx.clearRect(0, 0, 900, 250);
  cx.fillStyle = "rgba(185,28,28,0.06)";
  cx.fillRect(110, 12, 95, 212);
  cx.fillStyle = "rgba(4,120,87,0.07)";
  cx.fillRect(510, 12, 115, 212);
  cx.fillStyle = "#64748b";
  cx.font = "12px sans-serif";
  cx.fillText("Boundary Gate (3.8 us)", 114, 28);
  cx.fillText("Target SoS Gate (16.0 us)", 514, 28);
  cx.strokeStyle = "#cbd5e1";
  cx.beginPath();
  cx.moveTo(0, 125);
  cx.lineTo(900, 125);
  cx.stroke();
  cx.strokeStyle = pass ? "#002c3c" : "#b91c1c";
  cx.lineWidth = 2.2;
  cx.beginPath();
  for (let x = 0; x < 900; x++) {
    const t = (x / 900) * 25;
    const ring = 1 + (1 - cqi) * 1.8;
    const y = r * Math.exp(-Math.pow((t - 3.8) / (0.45 * ring), 2)) + b * Math.exp(-Math.pow((t - 16) / 0.85, 2));
    const py = 125 - y * Math.sin(2 * Math.PI * 1.7 * t) * 8.5;
    if (x) {
      cx.lineTo(x, py);
    } else {
      cx.moveTo(x, py);
    }
  }
  cx.stroke();
}

function audit(n, txt) {
  const rows = txt.trim().split(/\r?\n/).slice(1);
  let m = 0;
  let b = 0;
  for (const l of rows) {
    const p = l.split(",");
    const t = Number(p);
    const a = Math.abs(Number(p));
    if (t >= 2 && t <= 6) m = Math.max(m, a);
    if (t >= 14 && t <= 18) b = Math.max(b, a);
  }
  const rat = m ? b / m : 0;
  const cqi = Math.min(0.98, rat / (rat + 0.8));
  const verdict = cqi >= 0.65 ? "PASS (Valid coupling - Frame gated)" : "REJECT (Interfacial Air-Gap Signature)";
  document.getElementById("out").innerHTML =
    "File: <b>" + n + "</b> | Bulk/Boundary Ratio: <b>" + rat.toFixed(2) +
    "</b> | CQI: <b>" + cqi.toFixed(2) + "</b> | Verdict: <b>" + verdict + "</b>";
}

function demo(g) {
  const r = g ? 1.8 : 10.2;
  const b = g ? 4.27 : 1.05;
  audit(g ? "E001_sim_assisted.csv" : "E001_sim_unassisted.csv", "t,p\n3.8," + r + "\n16.0," + b);
}

document.getElementById("fi").onchange = function (e) {
  const f = e.target.files;
  if (!f) return;
  const rd = new FileReader();
  rd.onload = function (ev) {
    audit(f.name, ev.target.result);
  };
  rd.readAsText(f);
};

draw();
