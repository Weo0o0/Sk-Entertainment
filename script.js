/**
 * NextCoding Academy Landing Page Logic
 * Vanilla JavaScript (ES6+)
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initMetricsCounter();
  initTrackTabs();
  initSimulator();
  initFaqAccordion();
  initModals();
  initFormHandler();
  initPhoneInputFilter();
  initHeaderScrollEffect();
});

/* 1. Header Sticky Blur & Scroll Effect */
function initHeaderScrollEffect() {
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.style.background = 'rgba(10, 13, 20, 0.95)';
      header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.4)';
    } else {
      header.style.background = 'rgba(10, 13, 20, 0.8)';
      header.style.boxShadow = 'none';
    }
  });
}

/* 2. Mobile Navigation Toggle */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('show');
    });

    // Close mobile menu when a nav-link is clicked
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('show');
      });
    });
  }
}

/* 3. Number Counter Animation for Metrics */
function initMetricsCounter() {
  const counters = document.querySelectorAll('.metric-num');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach(counter => {
          const target = parseFloat(counter.getAttribute('data-target'));
          const isFloat = target % 1 !== 0;
          const duration = 1500; // ms
          const stepTime = 20;
          const steps = duration / stepTime;
          const increment = target / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.innerText = isFloat ? target.toFixed(1) : Math.round(target).toLocaleString();
              clearInterval(timer);
            } else {
              counter.innerText = isFloat ? current.toFixed(1) : Math.round(current).toLocaleString();
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  const metricsSection = document.querySelector('.hero-metrics');
  if (metricsSection) {
    observer.observe(metricsSection);
  }
}

/* 4. Curriculum Filter Tabs */
function initTrackTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const cards = document.querySelectorAll('.course-card');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-tab');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease-out';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* 5. Interactive Career Roadmap Simulator */
function initSimulator() {
  const levelSelect = document.getElementById('simLevel');
  const fieldSelect = document.getElementById('simField');

  const resTitle = document.getElementById('resTitle');
  const resDesc = document.getElementById('resDesc');
  const resDuration = document.getElementById('resDuration');
  const resSalary = document.getElementById('resSalary');

  const roadmapData = {
    fe: {
      title: '프론트엔드 풀스택 인터랙티브 과정',
      desc: '시각적 인터랙션 감각과 브라우저 렌더링 최적화, 최신 Next.js 및 TypeScript를 겸비한 취업 1순위 엔지니어 트랙입니다.',
      duration: '24주 집중',
      salary: '4,200 ~ 5,200 만원'
    },
    be: {
      title: '대용량 트래픽 & MSA 백엔드 엔지니어링 과정',
      desc: 'Java/Spring Boot 기반으로 수십만 동시접속 트랜잭션을 제어하고 안정적인 DB 및 Kafka 분산 아키텍처를 설계하는 코어 엔지니어 트랙입니다.',
      duration: '24주 집중',
      salary: '4,600 ~ 5,800 만원'
    },
    ai: {
      title: '생성형 AI & LLM Agent 엔지니어링 과정',
      desc: 'Python과 PyTorch를 넘어 실무 엔터프라이즈 RAG 시스템과 자율 에이전트를 프로덕션에 배포할 수 있는 최고 대우 유망 트랙입니다.',
      duration: '20주 집중',
      salary: '4,800 ~ 6,500 만원'
    },
    devops: {
      title: 'AWS & Kubernetes 클라우드 네이티브 SRE 과정',
      desc: '인프라 자동화(Terraform), 클러스터 구축, CI/CD 무중단 파이프라인 및 장애 대응 체계를 관장하는 필수 인프라 전문가 트랙입니다.',
      duration: '20주 집중',
      salary: '4,500 ~ 5,500 만원'
    }
  };

  function updateSimulation() {
    const field = fieldSelect.value;
    const level = levelSelect.value;
    const data = roadmapData[field];

    if (!data) return;

    resTitle.innerText = data.title;
    resDesc.innerText = data.desc;
    resDuration.innerText = data.duration;

    // Adjust salary slightly based on experience level
    if (level === 'career') {
      resSalary.innerText = '6,000 ~ 8,500 만원 (경력 전환)';
    } else if (level === 'cs') {
      resSalary.innerText = data.salary;
    } else {
      resSalary.innerText = data.salary;
    }

    // Trigger animation
    const resultBox = document.getElementById('simResult');
    resultBox.style.animation = 'none';
    resultBox.offsetHeight; // trigger reflow
    resultBox.style.animation = 'fadeIn 0.3s ease-out';
  }

  levelSelect.addEventListener('change', updateSimulation);
  fieldSelect.addEventListener('change', updateSimulation);
}

/* 6. FAQ Accordion */
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');

  items.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all
      items.forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-answer').style.maxHeight = null;
      });

      // If wasn't active, open it
      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

/* 7. Curriculum Detailed Modals */
function initModals() {
  const modal = document.getElementById('courseModal');
  const modalClose = document.getElementById('modalClose');
  const modalBody = document.getElementById('modalBody');
  const openButtons = document.querySelectorAll('.open-modal-btn');

  const courseDetails = {
    fe: {
      title: '프론트엔드 React/Next.js 전문가 상세 로드맵',
      steps: [
        { phase: '1단계 (1~4주차)', title: 'Modern JavaScript Deep Dive & 브라우저 렌더링 엔진', desc: '이벤트 루프, 비동기 프로그래밍, DOM 조작 최적화, 최신 ECMAScript' },
        { phase: '2단계 (5~10주차)', title: 'TypeScript & React 19 아키텍처', desc: '타입 시스템, 커스텀 훅 설계, 상태 관리(Zustand/TanStack Query), 컴포넌트 멘탈 모델' },
        { phase: '3단계 (11~16주차)', title: 'Next.js App Router & 서버 컴포넌트(RSC)', desc: 'SSR/SSG/ISR 하이브리드 렌더링, SEO 최적화, 캐싱 전략 및 Fullstack BFF 구축' },
        { phase: '4단계 (17~24주차)', title: '대규모 실전 프로덕트 협업 & 성능 최적화', desc: 'Lighthouse 95+ 웹 바이탈 최적화, 마이크로 프론트엔드 구조, 현업 CI/CD 배포' }
      ]
    },
    be: {
      title: '대용량 트래픽 & MSA 백엔드 상세 로드맵',
      steps: [
        { phase: '1단계 (1~4주차)', title: 'Java 21 Modern & 객체지향 설계 5대 원칙(SOLID)', desc: '동시성 프로그래밍, 가상 스레드(Virtual Threads), 클린 코드 및 리팩터링' },
        { phase: '2단계 (5~10주차)', title: 'Spring Boot 3, Spring Data JPA & QueryDSL', desc: 'RESTful API 설계, N+1 쿼리 최적화, DB 인덱싱 전략 및 트랜잭션 격리수준' },
        { phase: '3단계 (11~16주차)', title: 'Redis 분산 락, 캐싱 & Apache Kafka 이벤트 브로커', desc: '대용량 트래픽 완충 큐, 분산 메시징, Outbox 패턴, CQRS 아키텍처' },
        { phase: '4단계 (17~24주차)', title: '10만 RPS 스트레스 테스트 & 클라우드 장애 복구', desc: 'K6 부하 테스트, 분산 트랜잭션(Saga), 프로메테우스/그라파나 통합 모니터링' }
      ]
    },
    ai: {
      title: 'LLM Agent 시스템 & 생성형 AI 엔지니어링 상세 로드맵',
      steps: [
        { phase: '1단계 (1~4주차)', title: '파이썬 데이터 엔지니어링 & 딥러닝 기초', desc: 'Numpy, Pandas, PyTorch 기본 텐서 연산 및 딥러닝 백프로파게이션 구현' },
        { phase: '2단계 (5~9주차)', title: '트랜스포머 아키텍처와 오픈소스 LLM Fine-Tuning', desc: 'HuggingFace, LoRA/QLoRA 효율적 미세조정, vLLM을 활용한 고속 서빙 구축' },
        { phase: '3단계 (10~15주차)', title: '엔터프라이즈 RAG(검색 증강) & 벡터 데이터베이스', desc: 'LangChain, LlamaIndex, Pinecone, 하이브리드 검색, 청킹 최적화 파이프라인' },
        { phase: '4단계 (16~20주차)', title: '자율형 멀티 에이전트 시스템 실전 프로덕션', desc: '도구 호출(Tool Calling), 멀티 에이전트 협업 오케스트레이션, 프로덕션 배포' }
      ]
    },
    devops: {
      title: 'AWS & Kubernetes 클라우드 네이티브 상세 로드맵',
      steps: [
        { phase: '1단계 (1~4주차)', title: '리눅스 시스템 프로그래밍 & Docker 컨테이너라이제이션', desc: '네트워크 기초, 쉘 스크립트 자동화, 멀티스테이지 도커 빌드 경량화' },
        { phase: '2단계 (5~9주차)', title: 'Kubernetes 클러스터 아키텍처 및 Helm 패키징', desc: 'Pod, Deployment, Ingress, HPA 오토스케일링, 인프라 고가용성 설계' },
        { phase: '3단계 (10~14주차)', title: 'Terraform 코드형 인프라(IaC) & AWS 클라우드', desc: 'VPC, EKS, RDS, IAM 최소 권한 보안 및 테라폼 모듈화 오케스트레이션' },
        { phase: '4단계 (15~20주차)', title: 'GitHub Actions GitOps(ArgoCD) 무중단 배포 및 관측성', desc: '카나리/블루그린 배포, Prometheus & Grafana 관측 파이프라인, 모의 장애 복구' }
      ]
    }
  };

  openButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const courseKey = btn.getAttribute('data-course');
      const data = courseDetails[courseKey];
      if (!data) return;

      let html = `<h2 style="font-size: 1.4rem; font-weight: 800; margin-bottom: 20px; color: #fff;">${data.title}</h2>`;
      data.steps.forEach(s => {
        html += `
          <div class="modal-syllabus-step">
            <span style="font-size: 0.75rem; color: #818cf8; font-weight: 800;">${s.phase}</span>
            <h4>${s.title}</h4>
            <p>${s.desc}</p>
          </div>
        `;
      });
      html += `
        <div style="margin-top: 24px; text-align: right;">
          <a href="#consulting" class="btn btn-primary" onclick="document.getElementById('courseModal').classList.remove('active')">
            이 과정 상담 예약
          </a>
        </div>
      `;

      modalBody.innerHTML = html;
      modal.classList.add('active');
    });
  });

  modalClose.addEventListener('click', () => modal.classList.remove('active'));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });
}

/* 8. Consulting Form Submission Handler */
function initPhoneInputFilter() {
  const phoneInput = document.getElementById('userPhone');
  if (!phoneInput) return;

  phoneInput.addEventListener('input', (e) => {
    // 숫자 이외의 문자 제거
    let raw = e.target.value.replace(/[^0-9]/g, '');
    if (raw.length > 11) {
      raw = raw.slice(0, 11);
    }

    // 국내 휴대폰 번호(010-XXXX-XXXX) 또는 일반 번호 하이픈 자동 포맷팅
    if (raw.length <= 3) {
      e.target.value = raw;
    } else if (raw.length <= 7) {
      e.target.value = `${raw.slice(0, 3)}-${raw.slice(3)}`;
    } else {
      e.target.value = `${raw.slice(0, 3)}-${raw.slice(3, 7)}-${raw.slice(7)}`;
    }
  });

  // 키 입력 시 문자가 입력되지 않도록 사전 차단
  phoneInput.addEventListener('keydown', (e) => {
    // 특수 기능 키 허용 (Backspace, Delete, Tab, Arrow keys, Ctrl/Cmd shortcuts)
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter'];
    if (allowedKeys.includes(e.key) || e.ctrlKey || e.metaKey) {
      return;
    }

    // 숫자 키(0-9, NumPad 0-9)가 아니면 입력 차단
    if (!/^[0-9]$/.test(e.key)) {
      e.preventDefault();
    }
  });
}

function initFormHandler() {
  const form = document.getElementById('applyForm');
  const formSuccess = document.getElementById('formSuccess');
  const resetBtn = document.getElementById('resetFormBtn');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('userName').value.trim();
      const phone = document.getElementById('userPhone').value.trim();
      const email = document.getElementById('userEmail').value.trim();
      const track = document.getElementById('userTrack').value;

      if (!name || !phone || !email || !track) {
        showToast('필수 항목을 모두 입력해 주세요.');
        return;
      }

      // Simulate API submit delay
      const submitBtn = document.getElementById('submitBtn');
      submitBtn.innerText = '접수 중...';
      submitBtn.disabled = true;

      setTimeout(() => {
        form.style.display = 'none';
        formSuccess.classList.add('show');
        showToast(`🎉 ${name}님, 상담 신청이 성공적으로 접수되었습니다!`);
        submitBtn.innerText = '지금 무료 1:1 상담 신청하기';
        submitBtn.disabled = false;
      }, 700);
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        form.reset();
        formSuccess.classList.remove('show');
        form.style.display = 'block';
      });
    }
  }
}

/* 9. Simple Toast Notification Utility */
function showToast(message) {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>💬</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
