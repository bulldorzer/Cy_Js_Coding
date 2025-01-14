/**
 * 기본적인 지원 파일이 있어야 오류가 안남
 * 아래는 지원 파일이 생성하고, 필요한 코드를 추가한 것임
 */
Cypress.on('uncaught:exception', (err,runnable)=>{
    // Cypress가 처리하지 않는 예외를 무시
    return false;
});