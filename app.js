const branches = [
 ['Platform','platform','◉','The system view','Overall architecture for ultrasound-led multiphysics tissue research.'],
 ['Matrix','platform','▦','The sensing surface','A proposed conformal, geometry-aware surface for sensing and interrogation.'],
 ['Interface','platform','≋','The physical connection','Coupling, mechanical loading and the sensor-to-sample interface.'],
 ['Insight','platform','⌁','From signals to interpretation','Acquisition-aware reconstruction, inference and response analysis.'],
 ['Continuum','platform','↝','Context across time','Spatial and temporal data, longitudinal context and integration research.'],
 ['Explore','applications','◎','Where to investigate','Clinical opportunity discovery and a distinct materials / NDT exploration stream.'],
 ['Vascular','applications','⋔','Vascular questions','Research into vascular and procedural tissue assessment.'],
 ['Surgical','applications','✧','Procedural awareness','Investigation of tissue information during surgical and procedural workflows.'],
 ['Therapy','applications','◌','Intervention research','Therapeutic acoustics and supervised intervention concepts requiring separate validation.'],
 ['Bench','validation','⌑','Test the proposal','Physical experiments, apparatus planning and reproducibility.'],
 ['Evidence','validation','▤','Trace every claim','Provenance, validation, benchmarks and evidence assessment.'],
 ['Challenge','validation','↯','Try to prove it wrong','Failure analysis, falsification and competing explanations.']
];
const grid=document.querySelector('#branch-grid');
for(const [name,group,icon,subtitle,description] of branches){
 const card=document.createElement('a'); card.className='branch-card';card.dataset.group=group;
 card.href=`https://github.com/Endorys/platform/blob/main/docs/branches/${name.toLowerCase()}.md`;
 card.target='_blank';card.rel='noopener';
 card.innerHTML=`<div class="card-top"><span class="branch-icon" aria-hidden="true">${icon}</span><span class="arrow" aria-hidden="true">↗</span></div><span class="card-kicker">${subtitle}</span><h3>Endorys ${name}</h3><p>${description}</p>`;
 grid.append(card);
}
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
 const filter=button.dataset.filter;
 document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});
 let n=0;document.querySelectorAll('.branch-card').forEach(card=>{card.hidden=filter!=='all'&&card.dataset.group!==filter;if(!card.hidden)n++;});
 document.querySelector('#branch-count').textContent=filter==='all'?'Showing all 12 research branches.':`Showing ${n} research branches.`;
}));
const toggle=document.querySelector('.menu-toggle'),navigation=document.querySelector('#navigation');
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));navigation.classList.toggle('open',open);});
navigation.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{navigation.classList.remove('open');toggle.setAttribute('aria-expanded','false');}));
