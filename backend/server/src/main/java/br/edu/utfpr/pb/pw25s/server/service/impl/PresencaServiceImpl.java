package br.edu.utfpr.pb.pw25s.server.service.impl;

import br.edu.utfpr.pb.pw25s.server.model.CursoPresenca;
import br.edu.utfpr.pb.pw25s.server.repository.CursoPresencaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PresencaServiceImpl {

    @Autowired
    private CursoPresencaRepository presencaRepository;

    // Lançar presença
    public CursoPresenca registrarPresenca(CursoPresenca presenca) {
        return presencaRepository.save(presenca);
    }

    // Listar todas as presenças do aluno em um curso
    public List<CursoPresenca> listarPresencasDoAluno(Long cursoId, Long estudanteId) {
        return presencaRepository.findByCursoIdAndEstudanteId(cursoId, estudanteId);
    }

    // Editar presença do aluno
    public CursoPresenca editarPresenca(Long id, CursoPresenca novaPresenca) {
        Optional<CursoPresenca> presencaExistente = presencaRepository.findById(id);

        if (presencaExistente.isPresent()) {
            CursoPresenca presenca = presencaExistente.get();
            presenca.setPresenca(novaPresenca.getPresenca());
            return presencaRepository.save(presenca);
        }
        throw new RuntimeException("Presença não encontrada.");
    }
}