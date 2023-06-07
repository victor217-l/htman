let validate_auth_header = (header) => {
    let auth_header = header;
    return auth_header && auth_header.split(' ')[1]
}

