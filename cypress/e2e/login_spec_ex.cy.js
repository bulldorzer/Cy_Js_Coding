/** 테스트의 한단위 */
describe('로그인/로그아웃 테스트', () => {
  
  // 테스트가 실행되기 전에 한번만 실행
  before(()=>{
    cy.visit('https://www.naver.com')
  })

  /** 
   * 테스트 시나리오 작성 
   * 1. 로그인
  */
  it('로그인 테스트', () => {
    
    // 요소 선택하기
    // cy.get('a').contain('로그인').click();
    cy.get('a.MyView-module__link_login___HpHMW').click();

    cy.wait(500) // 잠깐 멈춤
    // cy.get('input#id') // 아이디 id 인것 선택
    cy.get('input[name="id"]').clear(); // 기존 내용 있다면 지움
    cy.get('input[name="id"]').type('test'); // id이름을 가진 input에 test 입력

    cy.get('input[name="pw"]').clear(); // 기존 내용 있다면 지움
    cy.get('input[name="pw"]').type('test'); // id이름을 가진 input에 test 입력

    cy.get('span.btn_text').click();

    /* 
      원하는 내용이 제대로 나타나는지 검사 
      1. url
      2. 페이지 내에 내용 존재 여부
    */ 

    // url
    // cy.url.should('include','/nidlogin.login')

    // 페이지내에 내용 존재여부
    cy.contains('자동입력 방지 문자').should('be.visible');


  })

  
})