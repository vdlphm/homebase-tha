import os
import socket
import threading


def handle_client(client_socket, target_host, target_port):
    try:
        target_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        target_socket.connect((target_host, target_port))

        while True:
            data = client_socket.recv(4096)
            if not data:
                break
            target_socket.send(data)

            target_response = target_socket.recv(4096)
            if not target_response:
                break
            client_socket.send(target_response)

    except socket.error as e:
        print(f"Socket error: {e}")
    except Exception as e:
        print(f"Exception: {e}")
    finally:
        client_socket.close()
        target_socket.close()


def proxy_server(bind_host, bind_port, target_host, target_port):
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.bind((bind_host, bind_port))
    server.listen(5)

    print(f"Proxy server is listening on {bind_host}:{bind_port}")
    try:
        while True:
            client_socket, client_addr = server.accept()

            proxy_thread = threading.Thread(target=handle_client, args=(client_socket, target_host, target_port))
            proxy_thread.start()
    except KeyboardInterrupt:
        print("Proxy server is shutting down...")
        server.close()


if __name__ == "__main__":
    bind_host = os.environ.get('HOST')
    bind_port = int(os.environ.get('PORT'))
    target_host = os.environ.get('TARGET_HOST')
    target_port = int(os.environ.get('TARGET_PORT'))

    proxy_server(bind_host, bind_port, target_host, target_port)
