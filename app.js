const plans=[
['10 Sep','Thursday','Chemistry · Solutions','Concepts and NCERT examples · 4h|Mathematics · Relations and Functions · 2h','6 hours'],
['11 Sep','Friday','Physics · Electric Charges and Fields','Theory, derivations and numericals · 4h|Solutions practice · 2h','6 hours'],
['12 Sep','Saturday','Mathematics · Inverse Trigonometry + Matrices','Formulas, worked examples and exercises','6 hours'],
['13 Sep','Sunday','Chemistry · Electrochemistry','Concepts and numericals · 4h|Electrostatics problem set · 2h','6 hours'],
['14 Sep','Monday','Physics · Potential and Capacitance','Theory and problems · 4h|Matrices practice · 2h','6 hours'],
['15 Sep','Tuesday','Chemistry · Chemical Kinetics','Rate laws and numericals · 4h|Determinants introduction · 2h','6 hours'],
['16 Sep','Wednesday','Physics · Current Electricity','Theory and numericals · 4h|Kinetics practice · 2h','6 hours'],
['17 Sep','Thursday','Mathematics · Determinants + Continuity','Three hours each with NCERT exercises','6 hours'],
['18 Sep','Friday','Chemistry · Inorganic pair','d- and f-Block · 3h|Coordination Compounds · 3h','6 hours'],
['19 Sep','Saturday','Physics · Moving Charges and Magnetism','Theory and numericals · 4h|Calculus practice · 2h','6 hours'],
['20 Sep','Sunday','Mathematics · Continuity and Differentiability','Core work · 4h|Mixed chapter practice · 2h','6 hours'],
['21 Sep','Monday','Physics · Magnetism + EMI','Magnetism and Matter · 3h|Electromagnetic Induction · 3h','6 hours'],
['22 Sep','Tuesday','Chemistry + Mathematics revision','Timed Chemistry · 3h|Timed Mathematics · 3h','Revision'],
['23 Sep','Wednesday','Physics revision + weak areas','Physics test and correction · 3h|Weakest PCM topics · 3h','Revision'],
['24 Sep','Thursday','English · complete syllabus','Literature · 3h|Grammar · 1.5h|Writing · 1.5h','6 hours'],
['25 Sep','English exam','General Studies · complete syllabus','After the exam: study only the college-prescribed scope','6 hours'],
['26 Sep','General Studies exam','Chemistry revision','Formulas, reactions, NCERT questions and error notebook','6 hours'],
['27 Sep','Sunday','Chemistry · final revision','One timed paper, correction, formulas and reactions','6 hours'],
['28 Sep','Chemistry exam','Alternative English · complete syllabus','Prose · 2h|Poetry · 1.5h|Grammar and comprehension · 1.5h|Essay · 1h','6 hours'],
['29 Sep','Alternative English exam','Physics · final revision','Derivations, formulas, diagrams and representative numericals','6 hours'],
['30 Sep','Physics exam','Mathematics · final revision','Formula sheet, weak exercises and one timed mixed set','6 hours'],
['1 Oct','Mathematics exam','Rest after the exam','Take the evening off. Recover before CSCA.','Exam day'],
['2–3 Oct','Buffer','Rest or spillover','Use only if PCM slipped or CSCA feels unfamiliar.','Flexible'],
['4 Oct','Sunday','CSCA · complete syllabus','Object-Oriented Programming in C++ · 3h|DBMS and SQL · 3h','6 hours'],
['5 Oct','CSCA exam','Quick recall only','Definitions, C++ syntax and SQL command patterns. No new material.','Exam day']
];
function mountPlan(target='planList'){const el=document.getElementById(target);if(!el)return;el.innerHTML=plans.map(x=>`<article class="plan-day"><div class="plan-date">${x[0]}<span>${x[1]}</span></div><div><h3>${x[2]}</h3><p>${x[3].split('|').join(' · ')}</p></div><span class="pill">${x[4]}</span></article>`).join('')}
function setupSearch(){const input=document.querySelector('[data-search]');if(!input)return;const cards=[...document.querySelectorAll('[data-topic]')],empty=document.querySelector('.empty');input.addEventListener('input',()=>{const q=input.value.toLowerCase().trim();let shown=0;cards.forEach(c=>{const yes=!q||c.dataset.topic.toLowerCase().includes(q);c.style.display=yes?'grid':'none';if(yes)shown++});if(empty)empty.style.display=shown?'none':'block'})}
function setupProgress(){const chapters=[...document.querySelectorAll('.chapter[data-topic]')];if(!chapters.length)return;const page=location.pathname.split('/').pop()||'index',key=`focus-progress:${page}`;let done={};try{done=JSON.parse(localStorage.getItem(key)||'{}')}catch{};const update=()=>{const n=Object.values(done).filter(Boolean).length;document.documentElement.style.setProperty('--progress',`${chapters.length?n/chapters.length*100:0}%`);const label=document.querySelector('[data-progress]');if(label)label.textContent=`${n} of ${chapters.length} complete`};chapters.forEach((card,i)=>{const watch=card.querySelector('.watch'),actions=document.createElement('div'),button=document.createElement('button');actions.className='chapter-actions';button.className='done-button';button.type='button';button.innerHTML='<span aria-hidden="true">✓</span><span>Done</span>';button.setAttribute('aria-pressed',done[i]?'true':'false');card.classList.toggle('is-done',!!done[i]);if(watch){watch.replaceWith(actions);actions.append(watch,button)}else{card.append(button)}button.addEventListener('click',()=>{done[i]=!done[i];localStorage.setItem(key,JSON.stringify(done));button.setAttribute('aria-pressed',done[i]?'true':'false');card.classList.toggle('is-done',!!done[i]);update()})});update()}
document.addEventListener('DOMContentLoaded',()=>{mountPlan();setupSearch();setupProgress()});
