package com.ceylonexplorer.service;

import com.ceylonexplorer.model.ContactMessage;
import com.ceylonexplorer.repository.ContactMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ContactMessageService {

    @Autowired
    private ContactMessageRepository repository;

    public List<ContactMessage> findAll() {
        return repository.findAll();
    }

    public Optional<ContactMessage> findById(Long id) {
        return repository.findById(id);
    }

    public ContactMessage save(ContactMessage entity) {
        return repository.save(entity);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
