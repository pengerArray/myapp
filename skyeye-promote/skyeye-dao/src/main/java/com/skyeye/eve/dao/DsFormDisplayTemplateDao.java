package com.skyeye.eve.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.github.miemiedev.mybatis.paginator.domain.PageBounds;

@Repository
@Mapper
public interface DsFormDisplayTemplateDao {

	public List<Map<String, Object>> queryDsFormDisplayTemplateList(Map<String, Object> map, PageBounds pageBounds) throws Exception;

	public int insertDsFormDisplayTemplateMation(Map<String, Object> map) throws Exception;

	public Map<String, Object> queryDsFormDisplayTemplateMationByName(Map<String, Object> map) throws Exception;

	public int deleteDsFormDisplayTemplateMationById(Map<String, Object> map) throws Exception;

	public Map<String, Object> queryDsFormDisplayTemplateMationToEditById(Map<String, Object> map) throws Exception;

	public Map<String, Object> queryDsFormDisplayTemplateMationByNameAndId(Map<String, Object> map) throws Exception;

	public int editDsFormDisplayTemplateMationById(Map<String, Object> map) throws Exception;

	public List<Map<String, Object>> queryDisplayTemplateListToShow(Map<String, Object> map) throws Exception;

}
