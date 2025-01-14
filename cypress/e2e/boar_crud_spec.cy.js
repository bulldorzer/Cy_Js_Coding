describe('template spec', () => {

  /** 문제2-3 : 사전 로그인 기능 구현 */
  const login = () =>{ // 사전 로그인 구문
    cy.visit('http://localhost:3000/member/login');

    // 로그인
    cy.get('input[name="email"]').type('user2@aaa.com');
    cy.get('input[name="pw"]').type('1111');
    cy.get('button').contains('로그인').click();

    // 팝업 닫기 
    cy.get('button').contains('닫기').click();
    // 고객게시판 이동
    cy.get('a').contains('고객게시판').click();

  }
  /**
   * 각 테스트마다 - 사전 실행하는 코드
   */
  beforeEach(()=>login())

  

  /** 문제 2-4 : 글쓰기 테스트 */
  it('글쓰기 테스트',()=>{
    
    cy.get('button').contains('글쓰기').click(); // 글쓰기 버튼 클릭

    // 확인1 url확인
    cy.url().should('include','board/add')
    // 확인2 화면 확인
    cy.contains('Board Add Page').should('be.visible')

    // 글쓰기 동작 실행
    cy.get('input[name="title"]').type("테스트1");
    cy.get('textarea[name="content"]').type("테스트1");
    cy.wait(1000)
    cy.get('button').contains('글쓰기').click();

    // 결과확인
    // 확인1 url확인
    cy.url().should('include','board/list')
    // 확인2 화면 확인
    cy.contains('테스트1').should('be.visible')
  })

  /** 문제 2-5 : 글수정 테스트 */
  it('글수정 테스트',()=>{
    cy.get('li').eq(1).click();
    cy.get('button.modify').click();
    cy.get('input[name="title"]').type('e2e수정테스트')
    cy.get('textarea[name="content"]').type('e2e수정테스트')
    cy.wait(1000) // 수정버튼 누르기전 1초대기
    cy.get('button.modify').click();
    cy.wait(1000) // 클로즈 팝업 닫기버튼 누르기전 1초대기
    cy.get('button.btn').contains('닫기').click();
    // 확인1 url확인
    cy.url().should('include','board/read')
    // 확인2 화면 확인
    cy.get('textarea[name="content"]').contains('e2e수정테스트').should('be.visible')

  })

  /** 문제 2-6 : 글삭제 테스트 */
  it('글삭제 테스트',()=>{
    cy.get('li').eq(1).click();
    cy.get('button.modify').click();
    cy.wait(1000) // 삭제 버튼 누르기전 1초 대기
    cy.get('button.delete').click();
    cy.wait(1000) // 클로즈 모달 닫기 버튼 누르기전 1초대기
    cy.get('button.btn').contains('닫기').click();
    cy.contains('Board List Page').should('be.visible')
  })


  
})