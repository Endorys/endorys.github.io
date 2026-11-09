const branches = [
 ['Platform','platform','◉','System architecture','The shared architecture for ultrasound-led sensing, acquisition and analysis research.'],
 ['Matrix','platform','▦','Conformal sensing','Research into conformal sensor arrangements, acoustic interrogation and measurement geometry.'],
 ['Interface','platform','≋','Contact and coupling','Coupling, mechanical loading and the sensor-to-sample interface.'],
 ['Insight','platform','⌁','Signal analysis and inference','Signal processing, reconstruction and inference research informed by acquisition conditions.'],
 ['Continuum','platform','↝','Longitudinal context','Research into spatial registration, measurements over time and data integration.'],
 ['Explore','applications','◎','Application discovery','Clinical application discovery and a separate materials and nondestructive testing (NDT) workstream.'],
 ['Vascular','applications','⋔','Vascular assessment','Investigation of measurement requirements for vascular tissue assessment.'],
 ['Surgical','applications','✧','Procedural sensing','Investigation of tissue measurements that could inform a defined surgical or procedural decision.'],
 ['Therapy','applications','◌','Therapeutic acoustics','Therapeutic acoustics and supervised intervention concepts requiring separate validation.'],
 ['Bench','validation','⌑','Experimental validation','Experimental design, apparatus requirements and reproducible physical measurements.'],
 ['Evidence','validation','▤','Evidence provenance','Traceable sources, validation records, benchmarks and assessment of supporting evidence.'],
 ['Challenge','validation','↯','Falsification and failure analysis','Failure analysis, falsification and competing explanations.']
];
const grid=document.querySelector('#branch-grid');
for(const [name,group,icon,subtitle,description] of branches){
 const card=document.createElement('a'); card.className='branch-card';card.dataset.group=group;
 card.href=`https://github.com/Endorys/platform/blob/main/${name.toLowerCase()}.md`;
 card.target='_blank';card.rel='noopener';
 card.innerHTML=`<div class="card-top"><span class="branch-icon" aria-hidden="true">${icon}</span><span class="arrow" aria-hidden="true">↗</span></div><span class="card-kicker">${subtitle}</span><h3>Endorys ${name}</h3><p>${description}</p>`;
 grid.append(card);
}
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
 const filter=button.dataset.filter;
 document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});
 let n=0;document.querySelectorAll('.branch-card').forEach(card=>{card.hidden=filter!=='all'&&card.dataset.group!==filter;if(!card.hidden)n++;});
 document.querySelector('#branch-count').textContent=filter==='all'?'Showing all 12 research workstreams.':`Showing ${n} research workstreams.`;
}));
const applicationData={
 breast:{label:'FOUNDING RESEARCH FOCUS',title:'Breast tissue research',intro:'Investigate the measurement requirements for repeatable acoustic characterization of tissue response. Breast assessment is the original motivation for Endorys.',question:'Can a consistent sample response be distinguished from changes in acquisition conditions and sensor geometry?',evidence:'A reproducible phantom baseline, followed by a defined intended use and an appropriately designed study with expert oversight and relevant approvals.',limit:'No screening, cancer detection or diagnostic performance is claimed.'},
 superficial:{label:'CANDIDATE RESEARCH DIRECTION',title:'Superficial tissue research',intro:'Accessible soft-tissue locations, including the forearm, are candidates for investigating contact, placement and motion as sources of measurement variation.',question:'How do contact, placement and motion affect measurement repeatability?',evidence:'A stable acoustic reference, an assessment of sensing depth and controls for confounding factors before any human study.',limit:'Clinical feasibility, elasticity measurement and safety require separate evaluation.'},
 procedural:{label:'LONGER-TERM APPLICATION CONCEPT',title:'Procedural tissue assessment',intro:'Investigate whether localized tissue measurements could inform a defined decision within an existing clinical workflow.',question:'Which measurement would inform a specific clinical decision, and what performance would that decision require?',evidence:'Clinician-defined requirements, a validated sensing module and separate evaluations of safety, workflow integration and clinical performance.',limit:'Surgical guidance, real-time diagnostic performance and clinical use have not been established.'}
};
document.querySelectorAll('[data-application]').forEach(button=>button.addEventListener('click',()=>{
 const data=applicationData[button.dataset.application];
 document.querySelectorAll('[data-application]').forEach(item=>{item.classList.toggle('active',item===button);item.setAttribute('aria-pressed',String(item===button));});
 const panel=document.querySelector('#application-detail');
 panel.querySelector('.pill').textContent=data.label;panel.querySelector('h3').textContent=data.title;panel.querySelector('p').textContent=data.intro;
 const descriptions=panel.querySelectorAll('dd');descriptions[0].textContent=data.question;descriptions[1].textContent=data.evidence;
 panel.querySelector('.application-limit').textContent=data.limit;
}));
