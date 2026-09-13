const body=document.body;
const menu=document.querySelector('.menu-toggle'), nav=document.querySelector('.nav-links');
menu?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',open)});
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const theme=document.querySelector('.theme-toggle');
const saved=localStorage.getItem('portfolio-theme');
if(saved==='dark') body.classList.add('dark');
theme?.addEventListener('click',()=>{body.classList.toggle('dark');localStorage.setItem('portfolio-theme',body.classList.contains('dark')?'dark':'light')});

const reveals=document.querySelectorAll('.reveal');
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12});
reveals.forEach(e=>io.observe(e));

const sections=[...document.querySelectorAll('main section[id]')], links=[...document.querySelectorAll('.nav-links a')];
const activeIO=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){links.forEach(l=>l.classList.toggle('active',l.getAttribute('href')==='#'+e.target.id))}}),{rootMargin:'-35% 0px -55% 0px'});
sections.forEach(s=>activeIO.observe(s));

document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{
 document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));btn.classList.add('active');
 const f=btn.dataset.filter;document.querySelectorAll('.project-card').forEach(c=>c.classList.toggle('hidden',f!=='all'&&c.dataset.category!==f));
}));

const projects={
 footstep:{type:'Energy Harvesting',title:'Footstep Power Generation Using Piezoelectric Sensors',html:`<p>An energy harvesting project based on piezoelectric sensors that converts mechanical energy from footsteps into electrical energy.</p><h3>Concepts / tools</h3><ul><li>Piezoelectric energy harvesting</li><li>PVDF and PZT materials</li><li>Power management and sensor integration</li><li>Raspberry Pi and Python</li><li>COMSOL Multiphysics</li></ul><h3>Team structure</h3><ol><li>Mechanical and energy generation / energy harvester</li><li>Power management and circuit design</li><li>Raspberry Pi and sensor integration</li><li>Programming, monitoring and reporting</li></ol><p><strong>Exact role, results and images:</strong> add only the details you personally completed.</p>`},
 comsol:{type:'Simulation / Modelling',title:'Piezoelectric Energy Harvesting Simulation Using COMSOL Multiphysics',html:`<p>A simulation/modeling project involving piezoelectric materials and energy harvesting.</p><h3>Study areas</h3><ul><li>PVDF and PZT-5H</li><li>Aluminium substrate</li><li>Piezoelectric effect</li><li>Structural mechanics and electric potential</li><li>Stress analysis and frequency response</li><li>Mesh refinement</li></ul><p><strong>Results and screenshots:</strong> placeholders are intentionally left for your verified simulation outputs.</p>`},
 academic:{type:'Academic / Laboratory',title:'MATLAB & Control-System Experiments',html:`<p>Academic experiments involving MATLAB/Simulink, including state-space modelling and system-response studies.</p><h3>Editable details</h3><ul><li>Add exact experiment titles</li><li>Add verified graphs and results</li><li>Add screenshots under <code>assets/projects/</code></li></ul>`}
};
const modal=document.querySelector('#modal'), mt=document.querySelector('#modal-title'), mtype=document.querySelector('#modal-type'), mc=document.querySelector('#modal-content');
document.querySelectorAll('.project-more').forEach(b=>b.addEventListener('click',()=>{const p=projects[b.dataset.project];mt.textContent=p.title;mtype.textContent=p.type;mc.innerHTML=p.html;modal.classList.add('open');modal.setAttribute('aria-hidden','false')}));
document.querySelector('.modal-close').addEventListener('click',closeModal);modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true')}

const top=document.querySelector('#back-top');window.addEventListener('scroll',()=>top.classList.toggle('show',scrollY>500));top.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));

document.querySelector('#contact-form').addEventListener('submit',e=>{
 e.preventDefault();const form=e.currentTarget,status=document.querySelector('#form-status');
 if(!form.checkValidity()){status.textContent='Please complete all fields and enter a valid email address.';form.reportValidity();return}
 status.textContent='Form validated successfully. No message was sent because no backend/email service is configured.';
 form.reset();
});
