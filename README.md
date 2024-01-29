# Whaling_docker
# 도커꺼줘 (고래잡이)
# 2023.11.22 ~ 2023.11.27
.....

![image](https://github.com/binhao22/Whaling_docker/assets/73528043/24a13920-8a8e-4258-95c3-86a0496963bf)  ![뜰채](https://github.com/binhao22/Whaling_docker/assets/73528043/bf5651fb-757d-4e90-b02b-2e0d8f78523d)
&nbsp; 
&nbsp; 
뜻밖의 정보 : **Docker API == Docker CLI**

[Engine API v1.24](https://docs.docker.com/engine/api/v1.24/)

- List containers → JSON 리턴
    
    `GET /v1.24/containers/json?all=1&before=8dfafdbc3a40&size=1 HTTP/1.1`
    
- Kill containers → JSON 리턴
    
    `POST /v1.24/containers/e90e34656806/kill HTTP/1.1`
    </br>

- WEB (React - Bootstrap) </br>
: List 버튼 (뜰채) 구현 - List containers API 연동 </br>
: Kill 버튼 (총) 구현 - Kill containers API 연동, 고래 팝업 </br>
: Kill 횟수 대시보드 구현
- WAS (Node - Express) </br>
: 특정 컨테이너의 PID 정보 토스
</br>
→ I am 사용자친화적인 GUI 환경에서 컨테이너 관리 가능 </br>
→ Kill 횟수 집계를 통해 실습에 대한 노오력 증명 가능 </br>
→ 최종적으로 애플리케이션을 도커 이미지로 빌드해서 **도커허브 or 사설저장소** 업로드 </br>
</br>
</br>
[Docker가 REST API를 이용함을 확인해보자](https://senticoding.tistory.com/95) </br>
[[Docker] 원격으로 Docker Container 조작하기 (REST API 방식 통신 방법)](https://tbmaster.tistory.com/146)
