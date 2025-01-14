describe('template spec', () => {
  
  /**
   * 각 테스트마다 - 사전 실행하는 코드
   */
  beforeEach(()=>{
    cy.visit('http://localhost:3000/member/login')
  })

  /**
   * 테스트1 : 로그인 페이지에 렌더링 잘되는지 확인
   */
  it('로그인 페이지 렌더링 확인', () => {
    cy.get('input[name="email"]').should("be.visible")
    cy.get('input[name="pw"]').should("be.visible")
    cy.get('button.btn').contains('로그인').should('be.visible'); // 로그인버튼 잘보임?
  })

  /**
   * 문제2-1 : 로그인 성공 테스트
   */
  /*
    email input상자 선택하여 내용 입력 = user0@aaa.com
    pw input 상자 선택하여 내용 입력 = 1111
    로그인 텍스트가 포함된 버튼 선택 -> 클릭
    닫기 텍스트가 포함된 버튼 선택 -> 클릭
    메인페이지 이동여부 확인
    -url검사 - 제외
    -페이지에 특정 내용 포함여부
  */
  it('로그인 성공테스트', () => {
    cy.get('input[name="email"]').clear();
    cy.get('input[name="email"]').type('user0@aaa.com');

    cy.get('input[name="pw"]').clear();
    cy.get('input[name="pw"]').type("1111");

    cy.get('button.btn').contains('로그인').should('be.visible'); // 로그인버튼 잘보임?
    cy.get('button.btn').contains('로그인').click();

    cy.get('button.btn').contains('닫기').should('be.visible'); // closeModal 잘보임?
    cy.get('button.btn').contains('닫기').click();

    cy.get('h2').contains('Main Page').should('be.visible'); // Main페이지 잘나옴?
  })
  

  /**
   * 문제2-2: 로그인 실패 테스트 - 아이디 비밀번호 잘못입력 오류
   */
  it('로그인 실패테스트', () => {
    cy.get('input[name="email"]').clear();
    cy.get('input[name="email"]').type('user0');

    cy.get('input[name="pw"]').clear();
    cy.get('input[name="pw"]').type("1");

    cy.wait(1000)
    cy.get('button.btn').contains('로그인').should('be.visible'); // 로그인버튼 잘보임?
    cy.get('button.btn').contains('로그인').click();

    cy.get('button.btn').contains('닫기').should('be.visible'); // closeModal 잘보임?
    cy.get('button.btn').contains('닫기').click();
    
    cy.url().should('include', 'member/login'); // url확인
    cy.contains('Login Page').should('be.visible') // 내용확인
  })
})